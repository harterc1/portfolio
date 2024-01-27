import QuartzCore

/// CALayer that supports automatic sublayer alignment and padding
///
/// Sublayers must specify their frame width and height before being added as those are
/// what LayoutLayer uses to determine the edges that need to be aligned.
///
/// Sublayer frame x and y are disregarded and overridden by LayoutLayer.
///
class LayoutLayer: CALayer {
    enum VerticalAlignment {
        case top
        case center
        case bottom
    }
    enum HorizontalAlignment {
        case left
        case center
        case right
    }
    struct Padding {
        var top: CGFloat = 0
        var left: CGFloat = 0
        var right: CGFloat = 0
        var bottom: CGFloat = 0

        static let zero = Padding()
    }
    enum Direction {
        case column
        case row
    }

    var verticalAlignment: VerticalAlignment = .center {
        didSet {
            self.setNeedsLayout()
        }
    }
    var horizontalAlignment: HorizontalAlignment = .center {
        didSet {
            self.setNeedsLayout()
        }
    }
    var padding: Padding = .zero {
        didSet {
            self.setNeedsLayout()
        }
    }
    var direction: Direction = .column {
        didSet {
            self.setNeedsLayout()
        }
    }
    var autoFitFrameX = true {
        didSet {
            self.setNeedsLayout()
        }
    }
    var autoFitFrameY = true {
        didSet {
            self.setNeedsLayout()
        }
    }

    override init() {
        super.init()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private var totalSublayerSize: CGSize {
        if direction == .column {
            return (sublayers ?? []).reduce(into: CGSize.zero) { result, sublayer in
                result = CGSize(
                    width: max(result.width, sublayer.frame.width),
                    height: result.height + sublayer.frame.height
                )
            }
        }
        return (sublayers ?? []).reduce(into: CGSize.zero) { result, sublayer in
            result = CGSize(
                width: result.width + sublayer.frame.width,
                height: max(result.height, sublayer.frame.height)
            )
        }
    }

    override func layoutSublayers() {
        guard isHidden == false else {
            self.frame = CGRect.zero
            return
        }
        updateFrameSize()
        updateSublayerPositions()
        super.layoutSublayers()
    }

    /// Updates this layer's frame size with respect to its sublayers
    ///
    private func updateFrameSize() {
        let width = !autoFitFrameX ? frame.width : (
            totalSublayerSize.width +
            padding.left +
            padding.right
        )
        let height = !autoFitFrameY ? frame.height : (
            totalSublayerSize.height +
            padding.top +
            padding.bottom
        )
        frame = CGRect(
            x: frame.minX,
            y: frame.minY,
            width: width,
            height: height
        )
    }

    /// Iterate over all sublayers and position them so that they align next to each other.
    ///
    /// It is recommended to call updateFrameSize() before running this function.
    ///
    /// Regarding the logic in this function; note that the origins for CALayer frame
    /// positions depend on the how they are being used.
    ///
    /// When drawing a CALayer with any AVFoundation utility (such as `AVAssetExportSession`),
    /// frame positions start in the lower-left of the drawing canvas.
    ///
    /// When drawing a CALayer attached to a UIView, frame positions start in the upper-left
    /// corner of the drawing canvas (in which case, you should set `isGeometryFlipped = true`
    /// on the CALayer for the logic in this function to work properly).
    ///
    /// Additionally, when drawing a CALayer hierarchy, iOS may additionally "flip" specific
    /// sublayers.  The logic in this function accounts for this scenario via
    /// the `contentsAreFlipped()` function.
    ///
    /// Padding effects the edge that the content pushes against.
    /// Content is expected to flow away from that edge and overflow outside
    /// of the opposing side if the content gets too large.
    ///
    private func updateSublayerPositions() {
        var sublayerY = getInitialSublayerY()

        if let sublayers = sublayers {
            for sublayer in sublayers {

                var sublayerX = padding.left
                if horizontalAlignment == .right {
                    sublayerX = frame.width - sublayer.frame.width - padding.right
                } else if horizontalAlignment == .center {
                    sublayerX = (frame.width - sublayer.frame.width) / 2
                }

                if !isFlipped {
                    sublayerY -= sublayer.frame.height
                }

                sublayer.frame = CGRect(
                    x: sublayerX,
                    y: sublayerY,
                    width: sublayer.frame.width,
                    height: sublayer.frame.height
                )

                if isFlipped {
                    sublayerY += sublayer.frame.height
                }
            }
        }
    }

    private var isFlipped: Bool { isGeometryFlipped && contentsAreFlipped() }

    private func getInitialSublayerY() -> CGFloat {
        var sublayerY: CGFloat = 0

        if isFlipped {
            switch verticalAlignment {
            case .bottom:
                sublayerY = frame.height - totalSublayerSize.height - padding.bottom
            case .top:
                sublayerY = padding.top
            case .center:
                sublayerY = (frame.height - totalSublayerSize.height) / 2
            }
        } else {
            switch verticalAlignment {
            case .bottom:
                sublayerY = totalSublayerSize.height + padding.bottom
            case .top:
                sublayerY = frame.height + (padding.top * (contentsAreFlipped() ? -1.0 : 1.0))
            case .center:
                sublayerY = frame.height - ((frame.height - totalSublayerSize.height) / 2)
            }
        }

        return sublayerY
    }
}