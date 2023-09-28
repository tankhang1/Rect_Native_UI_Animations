import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
const TestLibrary = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  console.log(errors);
  const onSignInPress = (e: any) => {
    console.log('asda', e, errors);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Controller
        control={control}
        name="username"
        rules={{required: true}}
        render={({field: {value, onChange, onBlur}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="name"
          />
        )}
      />
      <Button title="Sign In" onPress={handleSubmit(onSignInPress)} />
    </View>
  );
};

export default TestLibrary;
