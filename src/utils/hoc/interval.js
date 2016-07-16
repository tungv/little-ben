import { lifecycle } from 'recompose';

export const interval = (duration) => component => lifecycle({
  componentDidMount() {
    this.timer = setInterval(() => {
      this.forceUpdate();
    }, duration);
  },
  componentWillUnmount() {
    clearInterval(this.timer);
  },
})(component);
