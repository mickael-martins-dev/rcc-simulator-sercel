import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

const CurrencyFormater = Intl.NumberFormat('fr-Fr', {
    style: 'currency',
    currency: 'EUR'
});

interface IResult {
    element: JSX.Element
    sum: number
}

export const DEFAULT_BASE_FORFATAIRE = 12000;

const RCCEngine = () => {

    const [salary, setSalary] = useState(0);
    const [year, setYear] = useState(0);
    const [employeeAge, setEmployeeAge] = useState(0);

    const computeCadreSection = (): IResult => {

        let step1 = 0;
        let step2 = 0;
        let line1="";
        let line2="";
        if( year <= 7) {
            step1 = 1/4 * salary * Math.min(year, 7); // 0-7 ans
            step2 = 0; // Not exist
            line1 = `1-7 ans : 1/4 * ${CurrencyFormater.format(salary)} * ${Math.min(year, 7)} = ${CurrencyFormater.format(step1)}`
            line2 = "";
        }
        else if( year > 7) {
            step1 = 1/5*salary * Math.min(year, 7); // 0-7 ans
            step2 = 3/5*salary * Math.max(0, year - 7); // >7 ans 
            line1 = `1-7 ans : 1/5 * ${CurrencyFormater.format(salary)} * ${Math.min(year, 7)} = ${CurrencyFormater.format(step1)} `
            line2 =`8 ans et plus : 3/5 * ${CurrencyFormater.format(salary)} * ${Math.max(0, year - 7)} = ${CurrencyFormater.format(step2)}`
        }
        const factor = employeeAge >= 55 ? 1.3 : employeeAge >= 50 ? 1.2 : 1;
        const sum = step1 + step2;

        const total = CurrencyFormater.format(sum * factor + DEFAULT_BASE_FORFATAIRE + (salary * 4));

        const result2 = <>
            <h5> Légale </h5>
            <ul>
                <li> {line1} </li>
                <li> {line2} </li>
                {(factor > 1) && <li> Coefficient d'ancienneté {(factor * 100) % 100} % </li>}
                <p className="d-flex justify-content-end">
                    <h5 style={{ fontWeight: 600 }}> {CurrencyFormater.format(sum * factor)} </h5>
                </p>
            </ul>
            <h5> Supra </h5>
            <ul>
                <p className="m-0"> + Base forfaitaire : {CurrencyFormater.format(DEFAULT_BASE_FORFATAIRE)}  </p>
                <p className="m-0"> + 4 mois salaire de base : {CurrencyFormater.format(salary * 4)}  </p>
                <p className="d-flex justify-content-end">
                    <h5 style={{ fontWeight: 600 }}> {CurrencyFormater.format(DEFAULT_BASE_FORFATAIRE + salary * 4)} </h5>
                </p>
            </ul>

            <div className="border-bottom m-2"> </div>
            <div className="d-flex justify-content-end">
                <h4 style={{ fontWeight: 600 }}> {total} </h4>
            </div>
        </>;

        return {
            element: <> {result2}</>,
            sum: sum
        }
    }

    const computeNonCadreSection = (): IResult => {

        const step1 = 1/4 * salary * Math.min(year, 10); // 0-10 ans
        const step2 = 1/3 * salary * Math.max(0, year - 10); // > 10 ans
        const sum = step1 + step2;

        const total = CurrencyFormater.format(sum + DEFAULT_BASE_FORFATAIRE + (salary * 4));

        const result2 = <>
            <h5> Légale </h5>
            <ul>
                <li> 1-10ans : 1/4 * {CurrencyFormater.format(salary)} *  {Math.min(year, 10)}  = {CurrencyFormater.format(step1)}  </li>
                <li> 11ans et plus : 1/3 * {CurrencyFormater.format(salary)} *  {Math.max(0, year - 10)} = {CurrencyFormater.format(step2)}  </li>
                <p className="d-flex justify-content-end">
                    <h5 style={{ fontWeight: 600 }}> {CurrencyFormater.format(sum)} </h5>
                </p>

            </ul>
            <h5> Supra </h5>
            <ul>
                <p className="m-0"> + Base forfaitaire : {CurrencyFormater.format(DEFAULT_BASE_FORFATAIRE)}  </p>
                <p className="m-0"> + 4 mois salaire de base : {CurrencyFormater.format(salary * 4)}  </p>
                <p className="d-flex justify-content-end">
                    <h5 style={{ fontWeight: 600 }}> {CurrencyFormater.format(DEFAULT_BASE_FORFATAIRE + salary * 4)} </h5>
                </p>
            </ul>

            <div className="border-bottom m-2"> </div>
            <div className="d-flex justify-content-end">
                <h4 style={{ fontWeight: 600 }}> {total} </h4>
            </div>
        </>

        return {
            element: <> {result2}</>,
            sum: sum
        }

    }

    const cadreSection = computeCadreSection();
    const nonCadreSection = computeNonCadreSection();

    return (

        <>
            <h4 className="mb-4" style={{ fontWeight: 600 }}> Informations </h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label> Salaire brut mensuel </Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={(event) => setSalary(Number(event.target.value))} />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Label> Age (en année) </Form.Label>
                            <Form.Control type="number" placeholder="0" onChange={(event) => setEmployeeAge(Number(event.target.value))} />
                        </Col>
                        <Col>
                            <Form.Label> Année d'ancienneté </Form.Label>
                            <Form.Control type="number" placeholder="0" onChange={(event) => setYear(Number(event.target.value))} />
                        </Col>
                    </Row>
                </Form.Group>

            </Form>

            <div className="border-bottom m-4" />

            <Row>

                <Col>
                    <Card>
                        <Card.Header><h4> Indemnité Non Cadre </h4> </Card.Header>
                        <Card.Body>
                            {nonCadreSection.element}
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header><h4> Indemnité Cadre </h4> </Card.Header>
                        <Card.Body>
                            {cadreSection.element}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


        </>

        // result section
    );
}
export default RCCEngine;