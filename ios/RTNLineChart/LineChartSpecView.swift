import DGCharts
import React
import UIKit

struct CircleEntityStruct {
  let size: CGFloat
  let color: CGColor
  var isEmpty: Bool {
    return size == nil && color == nil
  }
}

@objc(LineChartSpecView)
class LineChartSpecView: UIView {
  private var chartView: LineChartView!
  
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupChartView()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    
    
    setupChartView()
  }
  
  private func setupChartView() {
    chartView = LineChartView(frame: bounds)
    chartView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(chartView)
    
    chartView.dragEnabled = true
    chartView.setScaleEnabled(false)
    chartView.pinchZoomEnabled = false
    
    chartView.dragXEnabled = false;
    chartView.dragYEnabled = false;
    chartView.scaleXEnabled = false;
    chartView.scaleYEnabled = false;
    chartView.backgroundColor = .white
    let xAxis = chartView.xAxis
    xAxis.labelPosition = .topInside
    xAxis.labelFont = .systemFont(ofSize: 15, weight: .light)
    xAxis.labelTextColor = UIColor.black
    xAxis.drawAxisLineEnabled = false
    xAxis.drawGridLinesEnabled = false
    xAxis.centerAxisLabelsEnabled = false
    xAxis.yOffset = 0
    xAxis.drawLabelsEnabled = false
    
    let leftAxis = chartView.leftAxis
    leftAxis.labelPosition = .insideChart
    leftAxis.labelFont = .systemFont(ofSize: 15, weight: .light)
    leftAxis.drawGridLinesEnabled = true
    leftAxis.granularityEnabled = true
    leftAxis.axisMinimum = 0
    leftAxis.axisMaximum = 120
    leftAxis.yOffset = 30
    leftAxis.xOffset = -10
    leftAxis.labelTextColor = UIColor.red
    leftAxis.drawLabelsEnabled = true
    chartView.data?.setDrawValues(false)

    chartView.legend.form = .line
    chartView.highlightPerTapEnabled = false
    chartView.highlightPerDragEnabled = false
    chartView.animate(xAxisDuration: 0.8)
    
    chartView.animate(yAxisDuration: 1)
    chartView.rightAxis.enabled = false
    chartView.legend.form = .line
  }
  
  @objc func setData(_ data: NSDictionary) {
    guard let dataSetsArray = data["dataSets"] as? [[String: Any]] else {
      print("Invalid data format for dataSets")
      return
    }
  
    var chartDataSets: [LineChartDataSet] = []
    
    let gradientData = data["gradientColorsData"] as? NSDictionary
    let drawHorizontalHighlightIndicatorEnabled = (data["drawHorizontalHighlightIndicatorEnabled"] as? Int == 1)
    let drawVerticalHighlightIndicatorEnabled = (data["drawVerticalHighlightIndicatorEnabled"] as? Int == 1)
    let fromColor = (gradientData?["from"] as? String) ?? "#FFFFFF"
    let toColor = (gradientData?["to"] as? String) ?? "#000000"
    let drawValuesEnabled =  (data["drawValuesEnabled"] as? Int == 1)
    
    let gradientColors = [
      ChartColorTemplates.colorFromString(fromColor).cgColor,
      ChartColorTemplates.colorFromString(toColor).cgColor
    ]
    
    for dataSetDict in dataSetsArray {
      guard let valuesArray = dataSetDict["values"] as? [[String: Any]],
            let label = dataSetDict["label"] as? String
      else {
        continue
      }
      
      let entries = valuesArray.compactMap { valueDict -> ChartDataEntry? in
        guard let x = valueDict["x"] as? Double,
              let y = valueDict["y"] as? Double
        else {
          return nil
        }
        return ChartDataEntry(x: x, y: y)
      }
      
      let dataSet = LineChartDataSet(entries: entries, label: label)
      
      
      if let mode = data["mode"] as? String {
       
        let chartMode: LineChartDataSet.Mode
        
        switch mode {
          case "cubicBezier":
            chartMode = .cubicBezier
          case "stepped":
            chartMode = .stepped
          case "linear":
            chartMode = .linear
          case "horizontalBezier":
            chartMode = .horizontalBezier
        default:
          chartMode = .linear
        }
        
        dataSet.mode = chartMode
      }
      
      dataSet.axisDependency = .left
      dataSet.setColor(UIColor.black)
      
      dataSet.colors = [NSUIColor.red]
      dataSet.circleRadius = 5.0
      dataSet.circleHoleRadius = 2.0
      dataSet.setCircleColor(.blue)
      dataSet.drawCirclesEnabled = true
      
      let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: gradientColors as CFArray, locations: nil)
      dataSet.fill = LinearGradientFill(gradient: gradient!, angle: 90)
      dataSet.lineDashLengths = nil
      dataSet.highlightLineDashLengths = [5, 2.5]
      dataSet.fillAlpha = 1
      dataSet.drawFilledEnabled = true
      dataSet.setColor(.black)
      dataSet.highlightLineWidth = 2.0
      dataSet.drawVerticalHighlightIndicatorEnabled =  drawVerticalHighlightIndicatorEnabled
      dataSet.drawHorizontalHighlightIndicatorEnabled = drawHorizontalHighlightIndicatorEnabled
      dataSet.valueFont = .systemFont(ofSize: 13)
      dataSet.highlightColor = UIColor.black
      dataSet.drawCircleHoleEnabled = false
      dataSet.fillFormatter = DefaultFillFormatter { _, dataProvider -> CGFloat in
        return dataProvider.chartYMin ?? 0.0 // Grafik alanının alt sınırını doldurma referansı olarak al
      }
      
      
      dataSet.lineWidth = 2.0
      dataSet.circleRadius = 4.0
      dataSet.drawCirclesEnabled = false
      dataSet.drawValuesEnabled = drawValuesEnabled
      
      chartDataSets.append(dataSet)
    }
    
    let chartData = LineChartData(dataSets: chartDataSets)
    chartView.data = chartData
    chartView.notifyDataSetChanged()
  }
  
  @objc public func setXAxisEntity(_ xAxisEntity: NSDictionary) {
    
    guard
      // let size = xAxisEntity["size"] as? CGFloat,
      let drawLabelsEnabled = xAxisEntity["drawLabelsEnabled"] as? NSNumber,
      let labelPositionString = xAxisEntity["labelPosition"] as? String,
      let colorString = xAxisEntity["labelTextColor"] as? String,
      let labelTextColor = UIColor(hex: colorString),
      let yOffset = xAxisEntity["yOffset"] as? CGFloat,
      let labelFont = xAxisEntity["labelFont"] as? [String: Any],
      let fontSize = labelFont["size"] as? CGFloat
        
    else {
      print(xAxisEntity,"xafff")
      return
    }
    
    
    if let labelPositionString = xAxisEntity["labelPosition"] as? String {
      // Enum değerine dönüştürmek için switch veya if kullanabilirsiniz
      let labelPosition: XAxis.LabelPosition
      
      switch labelPositionString {
      case "top":
        labelPosition = .top
      case "bottom":
        labelPosition = .bottom
      case "topInside":
        labelPosition = .topInside
      case "bottomInside":
        labelPosition = .bottomInside
      default:
        labelPosition = .bottom
      }
      
      chartView.xAxis.labelPosition = labelPosition
    }
    chartView.xAxis.labelFont = .systemFont(ofSize: fontSize, weight: .light)
    chartView.xAxis.drawLabelsEnabled = drawLabelsEnabled == 1
    chartView.xAxis.labelTextColor = labelTextColor
    chartView.xAxis.yOffset = yOffset
    
  }
  
  @objc public func setYAxisEntity(_ yAxisEntity: NSDictionary) {
    
    guard
      // let size = xAxisEntity["size"] as? CGFloat,
      let drawLabelsEnabled = yAxisEntity["drawLabelsEnabled"] as? NSNumber,
      let labelPositionString = yAxisEntity["labelPosition"] as? String,
      let colorString = yAxisEntity["labelTextColor"] as? String,
      let labelTextColor = UIColor(hex: colorString),
      let xOffset = yAxisEntity["xOffset"] as? CGFloat,
      let labelFont = yAxisEntity["labelFont"] as? [String: Any],
      let fontSize = labelFont["size"] as? CGFloat
        
    else {
      print(yAxisEntity,"yyyy")
      return
    }
    
    
    if let labelPositionString = yAxisEntity["labelPosition"] as? String {
      // Enum değerine dönüştürmek için switch veya if kullanabilirsiniz
      let labelPosition: YAxis.LabelPosition
      
      switch labelPositionString {
      case "outside":
        labelPosition = .outsideChart
      case "inside":
        labelPosition = .insideChart
      default:
        labelPosition = .insideChart
      }
      
      chartView.leftAxis.labelPosition = labelPosition
    }
    
    chartView.leftAxis.drawLabelsEnabled = drawLabelsEnabled == 1
    chartView.leftAxis.labelTextColor = labelTextColor
    chartView.leftAxis.xOffset = xOffset
    
  }
  
  @objc public func setMarkerEntity(_ markerEntity: NSDictionary) {
    
    guard
      let circleData = markerEntity["circleEntity"] as? [String: Any],
      let markerBgColorString = markerEntity["bgColor"] as? String,
      let markerTextColorString = markerEntity["bgColor"] as? String,
      let markerColor = UIColor(hex: markerBgColorString),
      let markerTextColor = UIColor(hex: markerTextColorString),
      let markerFontSize = markerEntity["fontSize"] as? CGFloat,
      let size = circleData["size"] as? CGFloat,
      let position = markerEntity["position"] as? [String: Any],
      let top = position["top"] as? CGFloat,
      let bottom = position["bottom"] as? CGFloat,
      let left = position["left"] as? CGFloat,
      let right = position["right"] as? CGFloat,
      let colorString = circleData["color"] as? String,
      let color = UIColor(hex: colorString)
    else {
   
      return
    }
    
    let circleEntity = CircleEntityStruct(size:size, color:color.cgColor)
    
    let marker = BalloonMarker(circleEntity: circleEntity,
                               color: markerColor,
                               font: .systemFont(ofSize: markerFontSize),
                               textColor: .white,
                               insets: UIEdgeInsets(top: top, left: left, bottom: bottom, right: right))
    marker.chartView = chartView
    
    chartView.marker = marker
  }
  
  @objc public func setDragEnabled(_ dragEnabled: Bool) {
    chartView.dragEnabled = dragEnabled
  }
  
  
  @objc public func setHighlightPerTapEnabled(_ highlightPerTapEnabled: Bool) {
    chartView.highlightPerTapEnabled = highlightPerTapEnabled
  }
  
  @objc public func setHighlightPerDragEnabled(_ highlightPerDragEnabled: Bool) {
    chartView.highlightPerDragEnabled = highlightPerDragEnabled
  }
  
  
}

