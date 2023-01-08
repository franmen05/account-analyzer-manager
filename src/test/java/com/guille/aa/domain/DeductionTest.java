package com.guille.aa.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.guille.aa.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeductionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deduction.class);
        Deduction deduction1 = new Deduction();
        deduction1.setId(1L);
        Deduction deduction2 = new Deduction();
        deduction2.setId(deduction1.getId());
        assertThat(deduction1).isEqualTo(deduction2);
        deduction2.setId(2L);
        assertThat(deduction1).isNotEqualTo(deduction2);
        deduction1.setId(null);
        assertThat(deduction1).isNotEqualTo(deduction2);
    }
}
