// A0WebKitViewController.m
//
// Copyright (c) 2015 Auth0 (http://auth0.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

#import "A0WebKitViewController.h"
#import <WebKit/WebKit.h>
#import "A0Errors.h"
#import "A0WebAuthentication.h"
#import "A0APIClient.h"
#import "A0AuthParameters.h"
#import "A0Token.h"
#import "A0Theme.h"
#import "Constants.h"

@interface A0WebKitViewController () <WKNavigationDelegate>

@property (strong, nonatomic) A0WebAuthentication *authentication;
@property (strong, nonatomic) A0APIClient *client;
@property (strong, nonatomic) NSURL *authorizeURL;
@property (copy, nonatomic) NSString *connectionName;

@property (weak, nonatomic) IBOutlet WKWebView *webview;
@property (weak, nonatomic) IBOutlet UIView *messageView;
@property (weak, nonatomic) IBOutlet UILabel *messageTitleLabel;
@property (weak, nonatomic) IBOutlet UILabel *messageDescriptionLabel;
@property (weak, nonatomic) IBOutlet UIButton *retryButton;

- (IBAction)cancel:(id)sender;
- (IBAction)retry:(id)sender;

@end

@implementation A0WebKitViewController

AUTH0_DYNAMIC_LOGGER_METHODS

- (instancetype)init {
    return [self initWithNibName:NSStringFromClass(self.class) bundle:[NSBundle bundleForClass:self.class]];
}

- (instancetype)initWithAPIClient:(A0APIClient * __nonnull)client
                   connectionName:(NSString * __nonnull)connectionName
                       parameters:(nullable A0AuthParameters *)parameters {
    self = [self init];
    if (self) {
        _authentication = [[A0WebAuthentication alloc] initWithClientId:client.clientId domainURL:client.baseURL connectionName:connectionName];
        _authorizeURL = [_authentication authorizeURLWithParameters:[parameters asAPIPayload]];
        _connectionName = connectionName;
        _client = client;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    WKWebView *webview = [[WKWebView alloc] initWithFrame:CGRectZero configuration:[[WKWebViewConfiguration alloc] init]];
    webview.translatesAutoresizingMaskIntoConstraints = NO;
    self.automaticallyAdjustsScrollViewInsets = YES;
    [self.view insertSubview:webview atIndex:0];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|[webview]|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(webview)]];
    [self.view addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[webview]|" options:0 metrics:nil views:NSDictionaryOfVariableBindings(webview)]];
    [self.view updateConstraints];
    webview.navigationDelegate = self;
    [webview loadRequest:[NSURLRequest requestWithURL:self.authorizeURL]];
    self.webview = webview;

    NSString *cancelTitle = self.localizedCancelButtonTitle ?: A0LocalizedString(@"Cancel");
    [self.navigationItem setLeftBarButtonItem:[[UIBarButtonItem alloc] initWithTitle:cancelTitle style:UIBarButtonItemStylePlain target:self action:@selector(cancel:)]];

    self.messageView.hidden = YES;
    A0Theme *theme = [A0Theme sharedInstance];
    [theme configureLabel:self.messageDescriptionLabel];
    self.messageTitleLabel.font = [theme fontForKey:A0ThemeTitleFont];
    self.messageTitleLabel.textColor = [theme colorForKey:A0ThemeTitleTextColor];
    self.retryButton.tintColor = self.navigationController.navigationBar.tintColor;
}

- (IBAction)cancel:(id)sender {
    [self.presentingViewController dismissViewControllerAnimated:YES completion:nil];
    if (self.onFailure) {
        self.onFailure([A0Errors auth0CancelledForConnectionName:self.connectionName]);
    }
    [self cleanCallbacks];
}

- (void)retry:(id)sender {
    [self.webview loadRequest:[NSURLRequest requestWithURL:self.authorizeURL]];
}

- (void)dealloc {
    [self cleanCallbacks];
}

- (void)networkTimedOutForNavigation:(WKNavigation *)navigation {
    A0LogError(@"Network timed out for navigation %@", navigation);
    self.messageDescriptionLabel.text = A0LocalizedString(@"Sorry, we couldn't reach our authentication server. Please check your network connection and try again.");
    [self.messageView updateConstraints];
    self.messageView.hidden = NO;
}

#pragma mark - WKNavigationDelegate

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    A0LogVerbose(@"Loaded page with navigation: %@", navigation);
    [self hideProgressIndicator];
    self.messageView.hidden = YES;
    self.title = webView.title;
}

- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation {
    A0LogVerbose(@"Started to load page with navigation: %@", navigation);
    [self showProgressIndicator];
}

- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    A0LogDebug(@"Failed navigation %@ with error %@", navigation, error);
    if (error.code == NSURLErrorTimedOut || error.code == NSURLErrorCannotConnectToHost) {
        [self networkTimedOutForNavigation:navigation];
    }
    [self hideProgressIndicator];
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    A0LogVerbose(@"Failed provisional navigation %@ with error %@", navigation, error);
    if (error.code == NSURLErrorTimedOut || error.code == NSURLErrorCannotConnectToHost) {
        [self networkTimedOutForNavigation:navigation];
    }
    [self hideProgressIndicator];
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    A0LogVerbose(@"Loading URL %@", navigationAction.request.URL);
    NSURLRequest *request = navigationAction.request;
    NSURL *url = request.URL;
    BOOL isCallback = [self.authentication validateURL:url];
    if (!isCallback) {
        decisionHandler(WKNavigationActionPolicyAllow);
        return;
    }
    NSError *error;
    A0Token *token = [self.authentication tokenFromURL:url error:&error];
    if (token) {
        A0IdPAuthenticationBlock success = self.onAuthentication;
        [self showProgressIndicator];
        [self.client fetchUserProfileWithIdToken:token.idToken success:^(A0UserProfile *profile) {
            decisionHandler(WKNavigationActionPolicyCancel);
            [self dismissWithCompletion:^{
                if (success) {
                    success(profile, token);
                }
            }];
        } failure:^(NSError *error) {
            [self handleError:error decisionHandler:decisionHandler];
        }];
    } else {
        [self handleError:error decisionHandler:decisionHandler];
    }
}

#pragma mark - Utility methods

- (void)cleanCallbacks {
    self.onAuthentication = nil;
    self.onFailure = nil;
}

- (void)dismissWithCompletion:(void(^)())completion {
    [self.presentingViewController dismissViewControllerAnimated:YES completion:^{
        completion();
        [self cleanCallbacks];
    }];
}

- (void)handleError:(NSError *)error decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    decisionHandler(WKNavigationActionPolicyCancel);
    [self dismissWithCompletion:^{
        if (self.onFailure) {
            self.onFailure(error);
        }
    }];
}

- (void)showProgressIndicator {
    UIActivityIndicatorView *indicator = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    indicator.color = self.navigationController.navigationBar.tintColor;
    [indicator startAnimating];
    [self.navigationItem setRightBarButtonItem:[[UIBarButtonItem alloc] initWithCustomView:indicator] animated:YES];
}

- (void)hideProgressIndicator {
    [self.navigationItem setRightBarButtonItem:nil animated:NO];
}

@end