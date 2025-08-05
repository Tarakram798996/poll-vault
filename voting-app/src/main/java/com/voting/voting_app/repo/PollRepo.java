package com.voting.voting_app.repo;

import com.voting.voting_app.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepo extends JpaRepository<Poll,Long> {
}
