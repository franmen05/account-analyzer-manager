package com.guille.aa.repository;

import com.guille.aa.domain.Deduction;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Deduction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeductionRepository extends JpaRepository<Deduction, Long> {
    @Query("select deduction from Deduction deduction where deduction.user.login = ?#{principal.username}")
    List<Deduction> findByUserIsCurrentUser();
}
