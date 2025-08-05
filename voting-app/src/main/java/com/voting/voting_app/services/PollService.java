package com.voting.voting_app.services;

import com.voting.voting_app.model.OptionVote;
import com.voting.voting_app.model.Poll;
import com.voting.voting_app.model.VoteRecord;
import com.voting.voting_app.repo.PollRepo;
import com.voting.voting_app.repo.VoteRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    @Autowired
    PollRepo pollRepo;

    @Autowired
    private VoteRecordRepository voteRecordRepository;

    public Poll createPoll(Poll poll) {
        return pollRepo.save(poll);
    }

    public List<Poll> getAll() {
        return pollRepo.findAll();
    }

    public Poll getById(Long id) {
        return pollRepo.findById(id)
                .orElseThrow(()-> new RuntimeException("No Poll is found"));
    }

    public void vote(Long pollId, int optionIndex, String username) {
        // Check if user has already voted
        if (voteRecordRepository.findByUsernameAndPollId(username, pollId).isPresent()) {
            throw new RuntimeException("You have already voted on this poll!");
        }

        Poll poll = pollRepo.findById(pollId)
                .orElseThrow(() -> new RuntimeException("No poll with given ID"));

        List<OptionVote> options = poll.getOptions();
        if (optionIndex < 0 || optionIndex >= options.size()) {
            throw new IllegalArgumentException("Invalid option index");
        }

        OptionVote selectedOption = options.get(optionIndex);
        selectedOption.setVoteCount(selectedOption.getVoteCount() + 1);
        pollRepo.save(poll);

        // Save record of this vote
        VoteRecord voteRecord = new VoteRecord();
        voteRecord.setPollId(pollId);
        voteRecord.setUsername(username);
        voteRecordRepository.save(voteRecord);
    }

    public void deleteById(Long id) {
        pollRepo.deleteById(id);
    }

    public Poll updatePoll(Long id, Poll updatedPoll) {
        Optional<Poll> optionalPoll = pollRepo.findById(id);
        if (optionalPoll.isEmpty()) return null;

        Poll existingPoll = optionalPoll.get();
        existingPoll.setQuestion(updatedPoll.getQuestion());
        existingPoll.setOptions(updatedPoll.getOptions());

        return pollRepo.save(existingPoll);
    }




}
