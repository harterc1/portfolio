import SwiftUI

extension View {
    func zoomPinchGesture(_ didUpdateZoomPercentageBy: @escaping (CGFloat) -> Void) -> some View {
        modifier(ZoomPinchGestureModifier(didUpdateZoomPercentageBy: didUpdateZoomPercentageBy))
    }
}

private struct ZoomPinchGestureModifierConstants {
    /*
     Default for MagnificationGesture is 0.01.
     We need to make ours less sensitive so that it doesn't interfere with
     out tab navigator.
     */
    static let minimumScaleDelta: CGFloat = 0.1

    /*
     Adjust this in order to tweak how jarring the zoom effect
     is based on drag.
     
     Lower values make zooming less sensitive
     */
    static let zoomSensitivity: CGFloat = 0.065
}

private struct ZoomPinchGestureModifier: ViewModifier {
    var didUpdateZoomPercentageBy: (CGFloat) -> Void

    @State private var prevPinchPercentage: CGFloat = 0
    @State private var initialPinchAmount: CGFloat?

    func body(content: Content) -> some View {
        content
            .simultaneousGesture(pinchGesture)
    }

    var pinchGesture: some Gesture {
        MagnificationGesture(minimumScaleDelta: ZoomPinchGestureModifierConstants.minimumScaleDelta)
            .onChanged { pinchAmount in
                // By the time this pinch gesture starts "recognizing", we've already
                // pinched a certain amount.
                // We compensate for that amount here to prevent a jumpiness when the gesture
                // starts to recognize the pinch.
                // The amount we need to compensate for is the very first pinch amount we receive.
                initialPinchAmount = initialPinchAmount ?? pinchAmount

                let pinchPercentage = (
                    (pinchAmount - initialPinchAmount!) *
                    ZoomPinchGestureModifierConstants.zoomSensitivity)

                let changeInZoomPercentage = pinchPercentage - prevPinchPercentage

                didUpdateZoomPercentageBy(changeInZoomPercentage)

                prevPinchPercentage = pinchPercentage
            }
            .onEnded { _ in
                prevPinchPercentage = 0
                initialPinchAmount = nil
            }
    }
}