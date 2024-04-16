import { View, Text, TextInput, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTheme } from '../../../hooks/ThemeContext';
import getDynamicStyles from './SignInModal.styles';

const signInSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required'),
});

const signUpSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
  passwordConfirmation: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

const Button = (props) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const { onPress, title = 'Click Me' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

/**
 * Renders a sign-in form.
 *
 * @component
 * @param {Function} handleSignIn - The function to handle sign-in.
 * @param {Object} styles - The styles for the component.
 * @returns {React.JSX.Element} The rendered sign-in form.
 */
const SignInForm = ({ handleSignIn, styles }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.formInputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              autoCapitalize="none"
              style={styles.formInput}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.formInputContainer}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              style={styles.formInput}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
        )}
        name="password"
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign In" onPress={handleSubmit(handleSignIn)} />
      </View>
    </>
  );
};

/**
 * Renders a sign-up form component.
 *
 * @component
 * @param {Function} handleSignUp - The function to handle sign-up.
 * @param {Object} styles - The styles object for the component.
 * @returns {React.JSX.Element} The sign-up form component.
 */
const SignUpForm = ({ handleSignUp, styles }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  return (
    <>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.formInputContainer}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email"
              autoCapitalize="none"
              style={styles.formInput}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.formInputContainer}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry
              style={styles.formInput}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.formInputContainer}>
            <Text style={styles.inputTitle}>Confirm Password</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry
              style={styles.formInput}
            />
            {errors.passwordConfirmation && (
              <Text style={styles.errorText}>{errors.passwordConfirmation.message}</Text>
            )}
          </View>
        )}
        name="passwordConfirmation"
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSubmit(handleSignUp)} />
      </View>
    </>
  );
};

/**
 * Represents a modal component for signing in or signing up.
 *
 * @component
 * @param {boolean} signInModalVisible - Determines whether the sign-in modal is visible.
 * @param {function} setSignInModalVisible - A function to set the visibility of the sign-in modal.
 * @param {function} handleSignIn - A function to handle the sign-in action.
 * @param {function} handleSignUp - A function to handle the sign-up action.
 * @returns {JSX.Element} The JSX element representing the sign-in modal.
 */
const SignInModal = ({ handleSignIn, handleSignUp, modalVisible, authError }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  return (
    <Modal animationType="none" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.backdrop}>
          <View style={styles.modalView}>
            <View style={styles.optionButtons}>
              <Pressable onPress={() => setIsSignIn(!isSignIn)}>
                <Text
                  style={[
                    styles.option,
                    isSignIn ? styles.optionSelected : styles.optionNotSelected,
                  ]}
                >
                  Sign In
                </Text>
              </Pressable>
              <Pressable onPress={() => setIsSignIn(!isSignIn)}>
                <Text
                  style={[
                    styles.option,
                    isSignIn ? styles.optionNotSelected : styles.optionSelected,
                  ]}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>
            <View style={styles.form}>
              {isSignIn ? (
                <SignInForm handleSignIn={handleSignIn} styles={styles} />
              ) : (
                <SignUpForm handleSignUp={handleSignUp} styles={styles} />
              )}
            </View>
            {authError && <Text style={styles.authError}>{authError}</Text>}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SignInModal;
