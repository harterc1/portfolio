import SwiftUI

extension View {
    func onTapGestureWithLocation(_ perform: @escaping (CGPoint) -> Void) -> some View {
        modifier(OnTapGestureWithLocationModifier(perform: perform))
    }
}

private struct Constants {
    static let maxTapDuration: TimeInterval = 0.25 // seconds
}

private struct OnTapGestureWithLocationModifier: ViewModifier {
    var perform: (CGPoint) -> Void

    @State private var tapGestureStartTime: Date?

    func body(content: Content) -> some View {
        content.gesture(gesture)
    }

    var gesture: some Gesture {
        DragGesture(minimumDistance: 0, coordinateSpace: .local)
            .onChanged { value in
                tapGestureStartTime = tapGestureStartTime ?? value.time
            }
            .onEnded { value in
                let tapDuration = (tapGestureStartTime ?? value.time).distance(to: value.time)
                let dragDistanceX = value.location.x - value.startLocation.x
                let dragDistanceY = value.location.y - value.startLocation.y

                // Only register a "tap" if there was no drag and it wasn't held down for too long
                if dragDistanceX == 0 &&
                    dragDistanceY == 0 &&
                    tapDuration < Constants.maxTapDuration {
                    perform(value.location)
                }

                tapGestureStartTime = nil
            }
    }
}