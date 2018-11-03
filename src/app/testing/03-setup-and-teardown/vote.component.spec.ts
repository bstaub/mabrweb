import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  // kann gemeinsam für mehrere Tests gebraucht werden, ausserhalb von it
  // let component = new VoteComponent();  // gäbe Fehler, sideeffect!
  let component: VoteComponent;

  beforeEach(() => { // set up
    // Arrange
    component = new VoteComponent(); // vor jedem Test
  });
  afterEach(() => { // tear down

  });
  beforeAll(() => {

  });
  afterAll(() => {

  });

  it('erhöhe totalVotes wenn +1', () => {
    // Act
    component.upVote();

    // Assert
    expect(component.totalVotes).toBe(1);
  });

  it('erniedrige totalVotes wenn -1', () => {

    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});
