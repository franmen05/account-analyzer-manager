package com.guille.aa.service.impl;

import com.guille.aa.domain.Deduction;
import com.guille.aa.repository.DeductionRepository;
import com.guille.aa.service.DeductionService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Deduction}.
 */
@Service
@Transactional
public class DeductionServiceImpl implements DeductionService {

    private final Logger log = LoggerFactory.getLogger(DeductionServiceImpl.class);

    private final DeductionRepository deductionRepository;

    public DeductionServiceImpl(DeductionRepository deductionRepository) {
        this.deductionRepository = deductionRepository;
    }

    @Override
    public Deduction save(Deduction deduction) {
        log.debug("Request to save Deduction : {}", deduction);
        return deductionRepository.save(deduction);
    }

    @Override
    public Optional<Deduction> partialUpdate(Deduction deduction) {
        log.debug("Request to partially update Deduction : {}", deduction);

        return deductionRepository
            .findById(deduction.getId())
            .map(existingDeduction -> {
                if (deduction.getDescription() != null) {
                    existingDeduction.setDescription(deduction.getDescription());
                }
                if (deduction.getType() != null) {
                    existingDeduction.setType(deduction.getType());
                }

                return existingDeduction;
            })
            .map(deductionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Deduction> findAll(Pageable pageable) {
        log.debug("Request to get all Deductions");
        return deductionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Deduction> findOne(Long id) {
        log.debug("Request to get Deduction : {}", id);
        return deductionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Deduction : {}", id);
        deductionRepository.deleteById(id);
    }
}
