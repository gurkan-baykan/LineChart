import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LineChartSpecView from './src/specs/LineChartNativeComponent';

function App(): JSX.Element {
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
      {
        limitLineEntity: {
          lineWidth: 2.0,
          lineColor: '#00a32c',
          lineDashLengths: [5, 3],
          labelPosition: 'leftTop',
          labelValueColor: '#00a32c',
          fontSize: 15,
          limit: 25,
        },
        values: values2,
        drawVerticalHighlightIndicatorEnabled: true,
        drawValuesEnabled: false,
        mode: 'linear',
        drawHorizontalHighlightIndicatorEnabled: false,
        gradientColorsData: {from: '#ffffff', to: '#080707'},
        label: '',
      },
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
});

export default App;
