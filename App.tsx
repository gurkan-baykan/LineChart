import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, StyleSheet, View} from 'react-native';

import NativeDeviceInformation from './specs/NativeDeviceInformation';
import RTNCenteredText from './specs/RTNCenteredText';

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

  useEffect(() => {
    if (NativeDeviceInformation) {
      setDeviceInfo({
        isBatteryCharging:
          NativeDeviceInformation?.getIsBatteryCharging() as boolean,
        isACBatteryCharge:
          NativeDeviceInformation?.getIsACBatteryCharge() as boolean,
        isUSBBatteryCharge:
          NativeDeviceInformation?.getIsUSBBatteryCharge() as boolean,
        batteryPercentage:
          NativeDeviceInformation?.getBatteryPercentage() as number,
        isLowMemory: NativeDeviceInformation?.getIsLowMemory() as boolean,
        availableMemory:
          NativeDeviceInformation?.getAvailableMemory() as string,
        totalMemory: NativeDeviceInformation?.getTotalMemory() as string,
        appVersion: NativeDeviceInformation?.getReadableVersion() as string,
        deviceBrand: NativeDeviceInformation?.getDeviceBrand() as string,
        device: NativeDeviceInformation?.getDevice() as string,
        deviceModel: NativeDeviceInformation?.getDeviceModel() as string,
        deviceManufacturer:
          NativeDeviceInformation?.getDeviceManufacturer() as string,
        product: NativeDeviceInformation?.getProduct() as string,
        osName: NativeDeviceInformation?.getOsName() as string,
        osVersion: NativeDeviceInformation?.getOsVersion() as string,
        hardware: NativeDeviceInformation?.getHardware() as string,
      });
    }
  }, []);

  // Helper function to render info rows with gradient effect
  const renderInfoRow = (label: string, value: string | number | undefined) => (
    <View style={styles.infoRowContainer}>
      <View style={styles.infoRowGradient}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  // Render a section with a custom title
  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionTitleUnderline} />
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}

        <View style={{flex: 1}}></View>

        <View style={styles.contentContainer}>
          <RTNCenteredText
            text="Hello World!"
            style={{width: '100%', height: 30}}
          />
          {renderSection(
            'Device Information',
            <>
              {renderInfoRow('Brand', deviceInfo?.deviceBrand)}
              {renderInfoRow('Device', deviceInfo?.device)}
              {renderInfoRow('Model', deviceInfo?.deviceModel)}
              {renderInfoRow('Manufacturer', deviceInfo?.deviceManufacturer)}
              {renderInfoRow('Product', deviceInfo?.product)}
            </>,
          )}
          {/**
   * 
   * <LineChart
            style={styles.chart}
            data={{
              label: 'Sample Line Chart',
              entries: [
                {x: 1, y: 2},
                {x: 2, y: 3},
                {x: 3, y: 5},
                {x: 4, y: 7},
              ],
            }}
          />
   * 
   */}

          {/* {renderSection(
            'System Details',
            <>
              {renderInfoRow('OS Name', deviceInfo?.osName)}
              {renderInfoRow('OS Version', deviceInfo?.osVersion)}
              {renderInfoRow('Hardware', deviceInfo?.hardware)}
            </>,
          )}

          {renderSection(
            'Battery Status',
            <>
              {renderInfoRow('Percentage', `${deviceInfo?.batteryPercentage}%`)}
              {renderInfoRow(
                'Charging',
                deviceInfo?.isBatteryCharging ? 'Active' : 'Inactive',
              )}
              {isAndroid
                ? renderInfoRow(
                    'AC Charge',
                    deviceInfo?.isACBatteryCharge
                      ? 'Connected'
                      : 'Disconnected',
                  )
                : null}
              {isAndroid
                ? renderInfoRow(
                    'USB Charge',
                    deviceInfo?.isUSBBatteryCharge
                      ? 'Connected'
                      : 'Disconnected',
                  )
                : null}
            </>,
          )}

          {isAndroid
            ? renderSection(
                'RAM Insights',
                <>
                  {renderInfoRow(
                    'RAM Status',
                    deviceInfo?.isLowMemory ? 'Low Memory' : 'Sufficient',
                  )}
                  {renderInfoRow('Available RAM', deviceInfo?.availableMemory)}
                  {renderInfoRow('Total RAM', deviceInfo?.totalMemory)}
                </>,
              )
            : renderSection(
                'Storage Insights',
                <>
                  {renderInfoRow(
                    'Storage Status',
                    deviceInfo?.isLowMemory ? 'Low Storage' : 'Sufficient',
                  )}
                  {renderInfoRow('Available', deviceInfo?.availableMemory)}
                  {renderInfoRow('Total', deviceInfo?.totalMemory)}
                </>,
              )}

          {renderSection(
            'Application',
            <>{renderInfoRow('Version', deviceInfo?.appVersion)}</>,
          )} */}
        </View>
      </ScrollView>
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
