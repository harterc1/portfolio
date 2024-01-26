import SwiftUI

extension View {
    func zoomDragGesture(_ didUpdateZoomPercentageBy: @escaping (CGFloat) -> Void) -> some View {
        modifier(ZoomDragGestureModifier(didUpdateZoomPercentageBy: didUpdateZoomPercentageBy))
    }
}

private struct ZoomDragGestureModifierConstants {
    /*
     Our tab navigator uses a minimum drag distance of 15.0
     so we need to make the minimum drag distance for zooming to be
     larger than 15.0 or else it blocks the tab navigator from being swipeable.
     */
    static let minimumDragDistance: CGFloat = 20
    static let numberOfPointsToDragToReachMaximumZoom: CGFloat = 1150
}

private struct ZoomDragGestureModifier: ViewModifier {
    var didUpdateZoomPercentageBy: (CGFloat) -> Void

    @State private var prevDragPercentage: CGFloat = 0
    @State private var initialDragAmount: CGFloat?

    func body(content: Content) -> some View {
        content
            .simultaneousGesture(dragGesture)
    }

    private var dragGesture: some Gesture {
        DragGesture(
            minimumDistance: ZoomDragGestureModifierConstants.minimumDragDistance,
            coordinateSpace: .local
        )
            .onChanged { value in
                let dragAmount = value.translation.height

                // By the time this drag gesture starts "recognizing", we've already
                // dragged a certain amount.
                // We compensate for that amount here to prevent a jumpiness when the gesture
                // starts to recognize the drag.
                // The amount we need to compensate for is the very first drag amount we receive.
                initialDragAmount = initialDragAmount ?? dragAmount

                let dragPercentage = (dragAmount - initialDragAmount!) /
                ZoomDragGestureModifierConstants.numberOfPointsToDragToReachMaximumZoom

                let changeInZoomPercentage = -(dragPercentage - prevDragPercentage)

                didUpdateZoomPercentageBy(changeInZoomPercentage)

                prevDragPercentage = dragPercentage
            }
            .onEnded { _ in
                prevDragPercentage = 0
                initialDragAmount = nil
            }
    }
}