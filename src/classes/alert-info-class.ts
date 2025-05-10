class AlertInfoClass {
  errorCode: string | null;
  heading: string;
  message: string;
  buttonLabel: string;
  linkURL: string;

  constructor(
    heading: string,
    message: string,
    buttonLabel: string,
    linkURL: string,
    errorCode: string | null = null
  ) {
    this.errorCode = errorCode;
    this.heading = heading;
    this.message = message;
    this.buttonLabel = buttonLabel;
    this.linkURL = linkURL;
  }
}

export default AlertInfoClass;
