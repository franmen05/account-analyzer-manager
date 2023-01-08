package com.guille.aa.service;

import com.guille.aa.domain.Deduction;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Deduction}.
 */
public interface DeductionService {
    /**
     * Save a deduction.
     *
     * @param deduction the entity to save.
     * @return the persisted entity.
     */
    Deduction save(Deduction deduction);

    /**
     * Partially updates a deduction.
     *
     * @param deduction the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Deduction> partialUpdate(Deduction deduction);

    /**
     * Get all the deductions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Deduction> findAll(Pageable pageable);

    /**
     * Get the "id" deduction.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Deduction> findOne(Long id);

    /**
     * Delete the "id" deduction.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
