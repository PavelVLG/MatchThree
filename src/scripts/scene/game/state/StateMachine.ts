import { STATE } from './States';

interface StateConfig {
    onEnter?: () => void;
    onUpdate?: (dt: number) => void;
    onExit?: () => void;
}

export default class StateMachine {
    private context?: object;
    private name: STATE;
    private states = new Map<STATE, StateConfig>();
    private current_state?: StateConfig;

    private is_state_switching = false;
    private state_queue: STATE[] = [];

    constructor(context?: object, name?: STATE) {
        this.context = context;
        this.name = name;
    }

    isCurrentState(key: STATE) {
        if (!this.current_state) return;

        return key === this.name;
    }

    addState(name: STATE, config?: StateConfig) {
        const { onEnter, onUpdate, onExit } = config;

        const states = {
            name,
            onEnter: onEnter?.bind(this.context),
            onUpdate: onUpdate?.bind(this.context),
            onExit: onExit?.bind(this.context),
        };

        this.states.set(name, states);
    }

    setState(key: STATE) {
        if (!this.states.has(key)) return;

        if (this.is_state_switching) {
            this.state_queue.push(key);
            return;
        }

        this.is_state_switching = true;

        if (this.current_state && this.current_state.onExit) this.current_state.onExit();

        this.current_state = this.states.get(key);

        if (this.current_state.onEnter) this.current_state.onEnter();

        this.is_state_switching = true;

        return this;
    }

    update(dt: number) {
        if (this.state_queue.length > 0) {
            const name = this.state_queue.shift();

            this.setState(name);

            return;
        }
        if (!this.current_state?.onUpdate) return;

        this.current_state.onUpdate(dt);
    }
}
