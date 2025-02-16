import Foundation

@objc(CenteredTextViewManager)
class CenteredTextViewManager: RCTViewManager {
    override func view() -> UIView! {
        return CenteredTextView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
