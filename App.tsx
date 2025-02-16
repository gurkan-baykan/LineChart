import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet, View} from 'react-native';

//import NativeDeviceInformation from './specs/NativeDeviceInformation';
import RTNCenteredText from './src/specs/CenteredTextNativeComponent';
import LineChartSpecView, {
  LabelPosition,
  LineData,
} from './src/specs/LineChartNativeComponent';
import PropTypes from 'prop-types';

type TDeviceInfo = {
  isBatteryCharging: boolean;
  isACBatteryCharge: boolean;
  isUSBBatteryCharge: boolean;
  batteryPercentage: number;
  isLowMemory: boolean;
  availableMemory: string;
  totalMemory: string;
  appVersion: string;
  deviceBrand: string;
  device: string;
  deviceModel: string;
  deviceManufacturer: string;
  product: string;
  osName: string;
  osVersion: string;
  hardware: string;
};

function App(): JSX.Element {
  const [deviceInfo, setDeviceInfo] = useState<TDeviceInfo | null>(null);

  // useEffect(() => {
  //   if (NativeDeviceInformation) {
  //     setDeviceInfo({
  //       isBatteryCharging:
  //         NativeDeviceInformation?.getIsBatteryCharging() as boolean,
  //       isACBatteryCharge:
  //         NativeDeviceInformation?.getIsACBatteryCharge() as boolean,
  //       isUSBBatteryCharge:
  //         NativeDeviceInformation?.getIsUSBBatteryCharge() as boolean,
  //       batteryPercentage:
  //         NativeDeviceInformation?.getBatteryPercentage() as number,
  //       isLowMemory: NativeDeviceInformation?.getIsLowMemory() as boolean,
  //       availableMemory:
  //         NativeDeviceInformation?.getAvailableMemory() as string,
  //       totalMemory: NativeDeviceInformation?.getTotalMemory() as string,
  //       appVersion: NativeDeviceInformation?.getReadableVersion() as string,
  //       deviceBrand: NativeDeviceInformation?.getDeviceBrand() as string,
  //       device: NativeDeviceInformation?.getDevice() as string,
  //       deviceModel: NativeDeviceInformation?.getDeviceModel() as string,
  //       deviceManufacturer:
  //         NativeDeviceInformation?.getDeviceManufacturer() as string,
  //       product: NativeDeviceInformation?.getProduct() as string,
  //       osName: NativeDeviceInformation?.getOsName() as string,
  //       osVersion: NativeDeviceInformation?.getOsVersion() as string,
  //       hardware: NativeDeviceInformation?.getHardware() as string,
  //     });
  //   }
  // }, []);

  const count = 15; // Kaç veri noktası oluşturulacağını belirler
  const range = 100; // Rastgele sayının üst sınırı (0 ile range arasında)

  const values = Array.from({length: count}, (_, i) => {
    const val = Math.floor(Math.random() * range) + 3; // 0 ile range arasında bir sayı üret ve 3 ekle
    return {x: i, y: val}; // Veriyi obje olarak oluştur
  });

  const lineData = {
    dataSets: [
      {
        values: values,
        label: 'Dilek native linecharti',
      },
    ],
    drawVerticalHighlightIndicatorEnabled: true,
    drawValuesEnabled: true,
    mode: 'lienar',
    drawHorizontalHighlightIndicatorEnabled: true,
    gradientColorsData: {from: '#f5f0f0', to: '#d6371e'},
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LineChartSpecView
          data={lineData}
          markerEntity={{
            bgColor: '#d6371e',
            color: 'white',
            fontSize: 14,
            circleEntity: {size: 18, color: '#1e498f'},
            position: {left: 8, top: 8, bottom: 20, right: 8},
          }}
          xAxisEntity={{
            drawLabelsEnabled: true,
            labelPosition: 'bottom',
            labelFont: {size: 12, weight: 'bold'},
            labelTextColor: '#1e498f',
            yOffset: 5,
          }}
          yAxisEntity={{
            drawLabelsEnabled: true,
            labelPosition: 'outside',
            labelFont: {size: 10, weight: 'bold'},
            labelTextColor: '#d6371e',
            xOffset: 0,
          }}
          highlightPerTapEnabled={true}
          highlightPerDragEnabled={true}
          dragEnabled={true}
          style={{width: '100%', height: '50%'}}
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
  chart: {
    width: 300,
    height: 300,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionTitleContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 5,
  },
  sectionTitleUnderline: {
    height: 3,
    width: 50,
    backgroundColor: '#3498db',
    borderRadius: 2,
  },
  infoRowContainer: {
    paddingHorizontal: 0,
  },
  infoRowGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
    width: '40%',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    width: '60%',
    textAlign: 'right',
  },
});

export default App;
