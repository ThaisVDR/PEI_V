import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#7a869a', 
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1a2433', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioCircleSelected: {
    borderColor: '#00d2b4', 
  },
  radioInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00d2b4', 
  },
  radioText: {
    color: '#7a869a',
    fontSize: 14,
  },
  radioTextSelected: {
    color: '#ffffff', 
    fontWeight: '600',
  },
});