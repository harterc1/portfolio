import QuartzCore
import Combine

protocol FilterEngineNodeLayer: AnyObject {
    typealias Node = FilterEngine.Node

    var node: Node { get set }
    var parentLayer: CALayer? { get set }
    var observers: [AnyCancellable] { get set }
    var isHidden: Bool { get set }

    init(node: Node, parentLayer: CALayer?, startTime: TimeInterval?, isGeometryFlipped: Bool, withAnimation: Bool)

    func textDidUpdate(_ text: String)
    func attributesDidUpdate(_ attributes: Node.Attributes)
}

extension FilterEngineNodeLayer {
    func textDidUpdate(_ text: String) { }
    func attributesDidUpdate(_ attributes: Node.Attributes) { }
}

extension FilterEngineNodeLayer {
    func setupBindings() {
        self.node.$text
            .sink(receiveValue: { [weak self] text in
                self?.textDidUpdate(text)
            })
            .store(in: &observers)

        self.node.$attributes
            .sink(receiveValue: { [weak self] attributes in
                self?.attributesDidUpdate(attributes)
            })
            .store(in: &observers)

        self.node.$isHidden
            .sink(receiveValue: { [weak self] isHidden in
                self?.update(isHidden: isHidden)
            })
            .store(in: &observers)
    }

    private func update(isHidden: Bool) {
        self.isHidden = isHidden
    }
}