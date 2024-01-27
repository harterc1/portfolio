import SwiftUI
import Foundation

struct FocusIndicatorViewConstants {
    static let visibleDuration: Double = 0.75 // seconds
    static let animationDuration: Double = 0.2 // seconds
    static let size: CGFloat = 120 // width & height
    static let scaleAmount: CGFloat = 0.6667
    static let crosshairArmLength: CGFloat = 8
}

struct FocusIndicatorView: View {
    let didTapWithLocation: (CGPoint) -> Void

    @State private var visible = false
    @State private var scale: CGFloat = 1
    @State private var coordinates: CGPoint = CGPoint()
    @State private var visibilityTimer: Timer?

    var body: some View {
        let size = FocusIndicatorViewConstants.size
        let halfSize = size / 2

        ZStack {
            Color.clear
            VStack {
                Path { path in
                    path.move(to: CGPoint(x: halfSize, y: 0))
                    path.addLine(to: CGPoint(x: halfSize, y: FocusIndicatorViewConstants.crosshairArmLength))
                    path.move(to: CGPoint(x: size, y: halfSize))
                    path.addLine(to: CGPoint(x: size - FocusIndicatorViewConstants.crosshairArmLength, y: halfSize))
                    path.move(to: CGPoint(x: halfSize, y: size))
                    path.addLine(to: CGPoint(x: halfSize, y: size - FocusIndicatorViewConstants.crosshairArmLength))
                    path.move(to: CGPoint(x: 0, y: halfSize))
                    path.addLine(to: CGPoint(x: FocusIndicatorViewConstants.crosshairArmLength, y: halfSize))
                }
                .stroke(Colors.yellowFocusIndicator.value, lineWidth: 1)
            }
            .frame(
                width: size,
                height: size)
            .border(Colors.yellowFocusIndicator.value, width: 2)
            .scaleEffect(scale)
            .opacity(visible ? 1 : 0)
            .position(coordinates)
        }
        .contentShape(Rectangle())
        .onTapGestureWithLocation { location in
            didTapWithLocation(location)
            coordinates = location
            scale = 1
            visible = false
            withAnimation(.easeOut(duration: FocusIndicatorViewConstants.animationDuration)) {
                showIndicator()
            }
        }
    }

    private func showIndicator() {
        visible = true
        scale = FocusIndicatorViewConstants.scaleAmount

        visibilityTimer?.invalidate()

        visibilityTimer = Timer.scheduledTimer(
            withTimeInterval: FocusIndicatorViewConstants.visibleDuration,
            repeats: false) { _ in
                withAnimation(.easeIn(duration: FocusIndicatorViewConstants.animationDuration)) {
                    visible = false
                }
        }
    }
}

struct CameraFocusIndicatorView_Previews: PreviewProvider {
    static var previews: some View {
        FocusIndicatorView { _ in }
    }
}