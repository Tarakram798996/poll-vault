package com.voting.voting_app.controller;

import com.voting.voting_app.model.Poll;
import com.voting.voting_app.request.Vote;
import com.voting.voting_app.services.PollService;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/polls")
public class PollController {

    @Autowired
    PollService pollService;

    @PostMapping
    public Poll createPoll(@RequestBody Poll poll){
        return pollService.createPoll(poll);
    }

    @GetMapping
    public List<Poll> getAllPolls(){
        return pollService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Poll> getById(@PathVariable Long id){
        return new ResponseEntity<>(pollService.getById(id), HttpStatus.OK);
    }

    @PostMapping("/vote")
    public ResponseEntity<String> vote(@RequestBody Vote vote, Authentication authentication) {
        String username = authentication.getName();
        try {
            pollService.vote(vote.getPollId(), vote.getOptionIndex(), username);
            return ResponseEntity.ok("Vote recorded successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePoll(@PathVariable Long id){
        pollService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePoll(@PathVariable Long id, @RequestBody Poll updatedPoll) {
        Poll poll = pollService.updatePoll(id, updatedPoll);
        if (poll == null) {
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
