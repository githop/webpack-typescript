

class Poc {
  constructor(private test:string = 'its working') {
    this.log();
  }

  log() {
    console.log(this.test);
  }

}


new Poc();