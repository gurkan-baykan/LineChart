import type {HostComponent, ViewProps} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import {Int32, Float} from 'react-native/Libraries/Types/CodegenTypes';

export interface DataSetEntry {
  x: Int32;
  y: Int32;
}
//npx @react-native-community/cli codegen --platform ios

export type Mode = 'cubicBezier' | 'stepped' | 'linear' | 'horizontalBezier';

export interface DataSet {
  values: DataSetEntry[];
  label: string;
}
export interface LineData {
  dataSets: DataSet[];
  gradientColorsData: {from: string; to: string};
  drawVerticalHighlightIndicatorEnabled: boolean;
  drawHorizontalHighlightIndicatorEnabled: boolean;
  drawValuesEnabled: boolean;
  mode: string; // you can use Mode type
}

export interface MarkerEntity {
  bgColor: string;
  color: string;
  fontSize: Float;
  position: {
    left: Float;
    top: Float;
    bottom: Float;
    right: Float;
  };
  circleEntity?: CircleEntity;
}
export interface CircleEntity {
  size: Float;
  color: string;
}

export interface LabelFont {
  size: Float;
  weight: string;
}
export type LabelPositionX = 'top' | 'bottom' | 'topInside' | 'bottomInside';
export type LabelPositionY = 'outside' | 'inside';

export interface XAxisEntity {
  drawLabelsEnabled: boolean;
  labelPosition: string; // LabelPosition type used to be here;
  labelFont?: LabelFont;
  labelTextColor?: string;
  yOffset?: Float;
}

export interface YAxisEntity {
  drawLabelsEnabled: boolean;
  labelPosition: string; // LabelPositionY type used to be here;
  labelFont?: LabelFont;
  labelTextColor?: string;
  xOffset?: Float;
}
export interface NativeProps extends ViewProps {
  data: LineData;
  dragEnabled?: boolean;
  markerEntity?: MarkerEntity;
  xAxisEntity?: XAxisEntity;
  yAxisEntity?: YAxisEntity;
  highlightPerTapEnabled: boolean;
  highlightPerDragEnabled: boolean;
}

export default codegenNativeComponent<NativeProps>(
  'LineChartSpecView',
) as HostComponent<NativeProps>;
