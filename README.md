# LineChart

**Summary**

Our package includes only line chart, a very useful and performant line chart is waiting for you to show financial data on the graph, the drawing of the component is done completely on the native side and expose it to the react-native side using fabric, and a performant display, effective animation, consistent gesture usage are waiting for you.

**Requirements**
Only react-native supports the new architecture

**Install**
Below is the command to install the package

```bash
yarn add @baykan/react-native-linechart-native
```

**Example Screenshots**

| iOS Example                                                                                             | Android Example                                                                                             |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img src="https://raw.githubusercontent.com/gurkan-baykan/LineChart/main/assets/ios.png" width="300" /> | <img src="https://raw.githubusercontent.com/gurkan-baykan/LineChart/main/assets/android.png" width="300" /> |

**Example Usage**

<details>
<summary>Click to see example code</summary>
<div style="background-color: #f6f8fa; padding: 16px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

```javascript
import {LineChartSpecView} from '@baykan/react-native-linechart-native';

const count = 16;
const range = 50;

const count2 = 16;
const range2 = 50;

const values = Array.from({length: count}, (_, i) => {
  const val = Math.floor(Math.random() * range) + 3;
  return {x: i, y: val};
});

const values2 = Array.from({length: count}, (_, i) => {
  const val = Math.floor(Math.random() * range) + 3;
  return {x: i, y: val};
});

const lineData = {
  dataSets: [
    {
      values: values,
      drawVerticalHighlightIndicatorEnabled: true,
      drawValuesEnabled: false,
      mode: 'linear',
      drawHorizontalHighlightIndicatorEnabled: false,
      gradientColorsData: {from: '#ffffff', to: '#080707'},
      label: 'Chart',
      limitLineEntity: {
        lineWidth: 2.0,
        lineColor: '#d6371e',
        lineDashLengths: [5, 2],
        labelPosition: 'leftTop',
        labelValueColor: '#d6371e',
        fontSize: 15,
        limit: 25,
      },
    },
    // {
    //   limitLineEntity: {
    //     lineWidth: 2.0,
    //     lineColor: '#00a32c',
    //     lineDashLengths: [5, 3],
    //     labelPosition: 'leftTop',
    //     labelValueColor: '#00a32c',
    //     fontSize: 15,
    //     limit: 25,
    //   },
    //   values: values2,
    //   drawVerticalHighlightIndicatorEnabled: true,
    //   drawValuesEnabled: false,
    //   mode: 'linear',
    //   drawHorizontalHighlightIndicatorEnabled: false,
    //   gradientColorsData: {from: '#ffffff', to: '#080707'},
    //   label: '',
    // },
  ],
};

return (
  <SafeAreaView style={styles.container}>
    <View
      style={{
        flex: 1,
        height: 550,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LineChartSpecView
        data={lineData}
        markerEntity={{
          color: '#161617',
          fontSize: 16,
          bgColor: '#ffffff',
          circleEntity: {size: 15, color: '#1e498f'},
          position: {left: 8, top: 0, bottom: 0, right: 8},
        }}
        xAxisEntity={{
          drawLabelsEnabled: true,
          labelPosition: 'bottom',
          labelFont: {size: 15, weight: 'bold'},
          labelTextColor: '#080707',
          yOffset: 0,
          xOffset: 0,
        }}
        yAxisEntity={{
          drawLabelsEnabled: true,
          labelPosition: 'outside',
          labelFont: {size: 15, weight: 'bold'},
          labelTextColor: '#080707',
          xOffset: 0,
          yOffset: 0,
          axisMin: 0,
          axisMax: 120,
        }}
        animationEntity={{
          xAxisDuration: 0.8,
          xAxisEasing: 'linear',
          yAxisDuration: 1,
          yAxisEasing: 'linear',
        }}
        drawGridLinesEnabled={true}
        highlightPerTapEnabled={true}
        highlightPerDragEnabled={true}
        dragEnabled={true}
        style={{width: '100%', height: 500, margin: 16}}
      />
    </View>
  </SafeAreaView>
);
```

</div>
</details>

## Props

| Property                  | Type              | Description                                                                                |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------ |
| `data`                    | `LineData`        | The name of the props variable that will show the data of the chart.                       |
| `dragEnabled`             | `boolean`         | Activates/passivates the movement of the highlights gradient of a chart's background.      |
| `bgColor`                 | `string`          | Defines the background color of the chart. use hex code !                                  |
| `animationEntity`         | `AnimationEntity` | Provides effective loading of the chart with animation.                                    |
| `drawGridLinesEnabled`    | `boolean`         | Provides visibility of lines on the x-axis of the chart.                                   |
| `markerEntity`            | `MarkerEntity`    | Shows the y-point values of the chart moving above the highlighter.                        |
| `xAxisEntity`             | `XAxisEntity`     | Defines x-axis label properties and formatting.                                            |
| `yAxisEntity`             | `YAxisEntity`     | Defines y-axis label properties and formatting.                                            |
| `highlightPerTapEnabled`  | `boolean`         | If set to `true`, when the user touches a data point, it will be highlighted.              |
| `highlightPerDragEnabled` | `boolean`         | Allows dragging to highlight data points.                                                  |
| `circleEntity`            | `CircleEntity`    | Together with the highlighter, it makes the round circle appear.                           |
| `dataSets`                | `object[]`        | Each index in `dataSets` represents a line, which can be customized with these properties. |
| `limitLineEntity`         | `object`          | Defines limit line properties, including width, color, and label settings.                 |

### Type Definitions

#### AnimationEntity

```typescript
{
  xAxisDuration: number;
  yAxisDuration: number;
  xAxisEasing: string;
  yAxisEasing: string;
}
```

#### MarkerEntity

```typescript
{
  bgColor: string;
  color: string;( use hex code string type)
  fontSize: number;
  position: {
    left: number;
    top: number;
    bottom: number;
    right: number;
  };
  circleEntity?: CircleEntity;
}
```

#### XAxisEntity

```typescript
{
  drawLabelsEnabled: boolean;
  labelPosition: string;
  labelFont?: LabelFont;
  labelTextColor?: string;
  yOffset?: number;
  xOffset?: number;
  axisMin?: number;
  axisMax?: number;
}
```

#### YAxisEntity

```typescript
{
  drawLabelsEnabled: boolean;
  labelPosition: string;
  labelFont?: LabelFont;
  labelTextColor?: string;( use hex code)
  xOffset?: number;
  yOffset?: number;
  axisMin?: number;
  axisMax?: number;
}
```

#### CircleEntity

```typescript
{
  size: number;
  color: string;( use hex code)
}
```

#### dataSets

```typescript
{
  values: DataSetEntry[];
  limitLineEntity: LimitLineEntity;
  label: string;
  gradientColorsData: { from: string; to: string };
  drawVerticalHighlightIndicatorEnabled: boolean;
  drawHorizontalHighlightIndicatorEnabled: boolean;
  drawValuesEnabled: boolean;
  mode: Mode;
}
```

#### limitLineEntity

```typescript
{
  lineWidth: number;
  lineColor: string;
  lineDashLengths: number[];
  labelPosition: string;
  fontSize: number;
  limit?: number;
  label?: string;
  labelValueColor?: string;
}
```

#### Line Chart Type (Mode prop)

```typescript
mode: 'cubicBezier' | 'stepped' | 'linear' | 'horizontalBezier';
```

---

**CoupleLineChart**

<img src="https://raw.githubusercontent.com/gurkan-baykan/LineChart/main/assets/couple.png" alt="Couple Line Chart Example" width="300" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
