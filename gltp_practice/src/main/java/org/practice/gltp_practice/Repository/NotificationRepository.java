package org.practice.gltp_practice.Repository;

import org.practice.gltp_practice.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository {

    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);

}
