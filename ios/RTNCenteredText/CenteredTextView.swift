import UIKit

@objc(CenteredTextView)
class CenteredTextView: UIView {
    private var label: UILabel!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }

    private func setupView() {
        backgroundColor = .white // Arka plan rengi
        print("hacııııı")
        // Etiketi oluştur
        label = UILabel()
        label.text = "GÜRKAN BAŞARDI Value" // Başlangıç metni
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false

        addSubview(label)

        // Auto Layout ile etiketi ortala
        NSLayoutConstraint.activate([
            label.leadingAnchor.constraint(equalTo: leadingAnchor),
            label.trailingAnchor.constraint(equalTo: trailingAnchor),
            label.topAnchor.constraint(equalTo: topAnchor),
            label.bottomAnchor.constraint(equalTo: bottomAnchor),
        ])
    }

    // Objective-C tarafından çağrılacak `setText` metodu
    @objc func setText(_ text: NSString) {
        label.text = text as String // UILabel üzerindeki metni güncelle
    }
}
