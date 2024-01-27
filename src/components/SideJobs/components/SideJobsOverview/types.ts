export enum SideJobTabs {
  Searches,
  Found,
}

export type TabsChangeCallback = ((event: React.SyntheticEvent, value: SideJobTabs) => void);
