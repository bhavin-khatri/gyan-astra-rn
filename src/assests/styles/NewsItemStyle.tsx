import {ResponsivePixels} from './ResponsivePixels';
import Fonts from './Fonts';
import Colors from './Colors';

export const newsItemStyle = {
  newsItemView: {
    marginTop: ResponsivePixels.size20,
    marginHorizontal: ResponsivePixels.size20,
  },
  newsRowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsImage: {
    height: ResponsivePixels.size180,
    alignSelf: 'center',
    width: '100%',
  },
  newsTitle: {
    fontSize: ResponsivePixels.size18,
    fontFamily: Fonts.name.bold,
    fontWeight: 'bold',
    marginVertical: ResponsivePixels.size5,
    color: Colors.black,
  },
  newsSubtitle: {
    fontSize: ResponsivePixels.size12,
    fontFamily: Fonts.name.medium,
    color: Colors.grey,
  },
  lineView: {
    height: ResponsivePixels.size2,
    backgroundColor: Colors.lightGrey,
    marginTop: ResponsivePixels.size20,
  },
};
