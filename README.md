# Padeye Design Calculation Formulas

**Reference Standards:** AISC ASD-9th Edition & API RP 2A WSD

---

1. Dimension and Clearance Checks

These formulas verify that the selected shackle and sling will physically fit the padeye geometry without interference.

- **Pin Clearance:** Ensures the shackle pin fits inside the padeye hole.

$$2R_3 - B > 0$$

- **Side Clearance ($I_m$):** Ensures there is enough space inside the shackle jaw for the padeye plate, the sling, and a safety gap.

$$C + \frac{B}{2} - R_1 - d_1 - G_1 > 4\text{ mm}$$

- **Shackle Fit ($X$):** Ensures the total thickness of the padeye (main plate + cheek plates) fits inside the shackle jaw width.

$$\frac{1}{2}(A - t_1 - 2t_2) > 0$$

- **Cheek Clearance ($Y - t_2$):** Ensures the cheek plates do not overlap the outer radius of the main plate.

$$(R_1 - R_2) - t_2 > 0$$

---

2. Cross Section Properties

Calculations to determine the areas and section moduli used in the subsequent stress checks.

- **Area of Section I-I** (Through pin center):

$$A_{I-I} = 2 \times [(R_1 - R_3)t_1 + 2(R_2 - R_3)t_2]$$

- **Area of Section II-II** (At base of padeye head):

$$A_{II-II} = L \times t_1$$

- **Area of Section III-III** (Tear-out plane):

$$A_{III-III} = (R_1 - R_3)t_1 + 2(R_2 - R_3)t_2$$

- **Section Modulus** (In-plane, Section II-II):

$$S_{z,II-II} = \frac{t_1 \times L^2}{6}$$

- **Section Modulus** (Out-of-plane, Section II-II):

$$S_{x,II-II} = \frac{L \times t_1^2}{6}$$

---

3. Strength Unity Checks

4.1 Section I-I (Tensile Strength)

Evaluates the stress at the pin hole centerline.

- **Required Tensile Stress:**

$$\sigma_u = \frac{F_1}{A_{I-I}}$$

- **Allowable Tensile Rupture:**

$$\sigma_n = 0.5 \times F_u$$

- **Allowable Tensile Yielding:**

$$\sigma_n = 0.6 \times F_y$$

- **Combined Tension & Shear** (AISC Eqn. C-H3-8):

$$\left(\frac{\sigma_u}{\sigma_n}\right) + \left(\frac{\tau_{u3}}{\sigma_{ns}}\right)^2 \le 1.0$$

4.2 Section II-II (Tensile & Shear Strength)

Evaluates the stress at the junction between the curved head and the base plate.

- **Axial Stress:**

$$\sigma_{u1} = \frac{F_1 \sin(\alpha)}{A_{II-II}}$$

- **In-plane Bending Stress:**

$$\sigma_{u2} = \frac{F_1 \cos(\alpha)H}{S_{z,II-II}}$$

- **Out-of-plane Bending Stress:**

$$\sigma_{u3} = \frac{F_2 H}{S_{x,II-II}}$$

- **Combined Tensile Stress:**

$$\sigma_u = \sigma_{u1} + \sigma_{u2} + \sigma_{u3}$$

**Allowables for Tension:**

- **Tensile Rupture:**

$$\sigma_n = 0.5 \times F_u$$

- **Tensile Yielding:**

$$\sigma_n = 0.6 \times F_y$$

**Shear Stresses at Section II-II:**

- **In-plane Shear:**

$$\tau_{xy} = \frac{F_1 \cos(\alpha)}{A_{II-II}}$$

- **Out-of-plane Shear:**

$$\tau_{xz} = \frac{F_2}{A_{II-II}}$$

- **Governing Shear Stress:**

$$\tau_u = \max(\tau_{xy}, \tau_{xz})$$

**Allowables for Shear:**

- **Shear Rupture:**

$$\sigma_{ns} = 0.3 \times F_u$$

- **Shear Yielding:**

$$\sigma_{ns} = 0.4 \times F_y$$

- **Combined Tension & Shear** (AISC Eqn. C-H3-8):

$$\left(\frac{\sigma_u}{\sigma_n}\right) + \left(\frac{\tau_u}{\sigma_{ns}}\right)^2 \le 1.0$$

---

5. Section III-III (Shear Tear-Out)

Evaluates the risk of the pin tearing out through the top of the padeye.

- **Required Shear Stress:**

$$\tau_u = \frac{F_1}{2 \times A_{III-III}}$$

- **Allowable Shear Rupture:**

$$\sigma_{ns} = 0.3 \times F_u$$

- **Allowable Shear Yielding:**

$$\sigma_{ns} = 0.4 \times F_y$$

---

6. Bearing Strength (AISC Sec J8)

Evaluates the local crushing stress inside the pin hole.

- **Bearing Area:**

$$A_{pb} = 2R_3(t_1 + 2t_2)$$

- **Required Bearing Stress:**

$$\sigma_u = \frac{F_1}{A_{pb}}$$

- **Allowable Bearing Strength:**

$$\sigma_n = 0.9 \times F_y$$

---

7. Weld Stress (AISC Eqn. J2-5)

Evaluates the strength of the weld attaching the padeye to the base structure.

- **Weld Throat Area:** (where weld length $l_w = 2L$ )

$$A_w = 0.707 \times l_w \times h_{wm}$$

- **Required Weld Stress:**

$$\tau_u = \frac{F_1}{A_w}$$

- **Allowable Weld Stress** (Directional Increase):

$$F_w = \frac{0.6F_y (1 + 0.5 \sin^{1.5}(\alpha))}{\Omega_{weld}}$$

_(Note: The code uses an effective factor of 2 for $\Omega_{weld}$ to derive the working allowable).\_

- **Unity Check:**

$$\frac{\tau_u}{F_w} \le 1.0$$

---

## Nomenclature

| Symbol   | Description                                  |
| -------- | -------------------------------------------- |
| $F_1$    | Sling Load (factored by dynamics)            |
| $F_2$    | Out-of-plane lateral load (5% of Sling Load) |
| $F_y$    | Material yield strength                      |
| $F_u$    | Material ultimate tensile strength           |
| $R_1$    | Padeye main radius                           |
| $R_2$    | Cheek plate radius                           |
| $R_3$    | Pin hole radius                              |
| $t_1$    | Main plate thickness                         |
| $t_2$    | Cheek plate thickness                        |
| $H$      | Height to pin hole center                    |
| $L$      | Base length                                  |
| $\alpha$ | Sling angle                                  |
