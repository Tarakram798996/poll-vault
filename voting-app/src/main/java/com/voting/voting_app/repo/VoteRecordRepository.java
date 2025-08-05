package com.voting.voting_app.repo;

import com.voting.voting_app.model.VoteRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VoteRecordRepository extends JpaRepository<VoteRecord, Long> {
    Optional<VoteRecord> findByUsernameAndPollId(String username, Long pollId);
}
