import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from "react-native-toast-message";

export function ToastInstance() {
  return (
    <Toast
      config={{
        error: (props) => (
          <ErrorToast
            {...props}
            style={{ backgroundColor: "#151B23", borderLeftColor: "red" }}
            text1Style={{
              fontSize: 17,
              color: "white",
            }}
            text2Style={{
              fontSize: 15,
            }}
          />
        ),
        success: (props) => (
          <SuccessToast
            {...props}
            style={{ backgroundColor: "#151B23", borderLeftColor: "green" }}
            text1Style={{
              fontSize: 17,
              color: "white",
            }}
            text2Style={{
              fontSize: 15,
            }}
          />
        ),
        info: (props) => (
          <InfoToast
            {...props}
            style={{ backgroundColor: "#151B23", borderLeftColor: "blue" }}
            text1Style={{
              fontSize: 17,
              color: "white",
            }}
            text2Style={{
              fontSize: 15,
            }}
          />
        ),
      }}
    />
  );
}
