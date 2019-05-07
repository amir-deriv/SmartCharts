import { observable, action, when } from 'mobx';

export default class WidgetStore {
    @observable stx;
    @observable enableHome = false;

    get chart() { return this.mainStore.chart; }
    get stateStore() { return this.mainStore.state; }
    get stxx() { return this.chart.stxx; }

    constructor(mainStore) {
        this.mainStore = mainStore;
        when(() => this.mainStore.chart.context, this.onContextReady);
    }

    onContextReady = () => {
        this.stx = this.mainStore.chart.context.stx;
        this.stxx.addEventListener('move', this.scrollListener.bind(this));
    };

    @action.bound scrollListener() {
        this.enableHome = !this.stx.isHome();
    }

    @action.bound onHome() {
        this.enableHome = false;
        this.stx.home();
    }

    @action.bound onScale() {
        this.stateStore.scrollChartToLeft();
    }
}
