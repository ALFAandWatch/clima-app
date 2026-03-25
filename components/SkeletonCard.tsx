import { StyleSheet, View } from 'react-native';

export const SkeletonCard = () => {
   return (
      <View style={styles.card}>
         <View style={styles.lineShort} />
         <View style={styles.circle} />
         <View style={styles.line} />
         <View style={styles.lineSmall} />
      </View>
   );
};

const styles = StyleSheet.create({
   card: {
      width: 150,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#E5E7EB',
      marginRight: 10,
   },
   line: {
      height: 12,
      backgroundColor: '#D1D5DB',
      borderRadius: 6,
      marginVertical: 5,
   },
   lineShort: {
      height: 10,
      width: 60,
      backgroundColor: '#D1D5DB',
      borderRadius: 6,
      marginBottom: 10,
   },
   lineSmall: {
      height: 10,
      width: 80,
      backgroundColor: '#D1D5DB',
      borderRadius: 6,
      marginTop: 5,
   },
   circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#D1D5DB',
      alignSelf: 'center',
      marginVertical: 10,
   },
});
