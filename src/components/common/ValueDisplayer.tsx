import { observer } from 'mobx-react-lite';

interface IValueDisplayerProps {
  getValue: () => string | number;
}

const ValueDisplayer = observer((props: IValueDisplayerProps) => {
  const { getValue } = props;

  return <>{ getValue() }</>;
});

export default ValueDisplayer;