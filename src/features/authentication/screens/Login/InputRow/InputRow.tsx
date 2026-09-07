import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputRowProps extends TextInputProps {
  label: string;
}

const InputRow = ({
  label,
  value,
  onChangeText,
  ...rest
}: InputRowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.lbl}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 20,
  },
  lbl: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 8,
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    paddingVertical: 0,
  },
  rightElementContainer: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputRow;
