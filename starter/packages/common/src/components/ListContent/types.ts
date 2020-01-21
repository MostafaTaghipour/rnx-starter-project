import { FilterableConfigModel, FilterModel } from "@app/store/baseTypes/types";

export interface FilterComponentProps {
	config: FilterableConfigModel;
	selected?: FilterModel;
	onChange: (id: number, value?: FilterModel) => any;
}