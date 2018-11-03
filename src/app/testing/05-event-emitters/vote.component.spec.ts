import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('soll voteChange event auslösenen when upvoted', () => {
    let totalVotes = null;
    component.voteChanged.subscribe(tv => totalVotes = tv);

      component.upVote();

      // expect(totalVots).not.toBeNull();
      expect(totalVotes).not.toBeNull();  // recht generic
      expect(totalVotes).toBe(1);

  });
});
