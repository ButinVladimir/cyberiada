export class AssignCloneEvent extends Event {
  static readonly type = 'assign-clone';

  constructor() {
    super(AssignCloneEvent.type, {
      bubbles: true,
      composed: true,
    });
  }
}
