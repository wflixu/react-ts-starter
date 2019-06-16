import * as React from "react";
import { Prompt } from "react-router-dom";

interface IProps {
  when: boolean;
  message: () => string;
}
interface IState {
  show: boolean;
}

class PromptFix extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      show: false
    };
  }

  public componentDidMount() {
    this.setState({ show: this.props.when });
  }

  public componentWillUnmount() {
    this.setState({ show: false });
  }

  public render() {
    return this.state.show ? (
      <Prompt when={this.state.show} message={this.props.message} />
    ) : null;
  }
}

export default PromptFix;