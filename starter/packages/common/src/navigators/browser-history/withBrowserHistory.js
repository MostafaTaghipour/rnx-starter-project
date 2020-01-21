import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default function stubFunc(W) {
	const Comp = class extends React.Component {
		render() {
			//@ts-ignore
			const { navigatorRef, ...rest } = this.props;

			return (
				<W
					{...rest}
					ref={ref => {
						navigatorRef && navigatorRef(ref);
					}}
				/>
			);
		}
	};

	return hoistNonReactStatics(Comp, W);
}
