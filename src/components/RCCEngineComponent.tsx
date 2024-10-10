import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

const CurrencyFormater = Intl.NumberFormat('fr-Fr', {
    style: 'currency',
    currency: 'EUR'
});

interface IResult {
    element: JSX.Element
    sum: number
}

const RCCEngine = () => {

    const [salary, setSalary] = useState(0);
    const [year, setYear] = useState(0);
    const [mounth, setMounth] = useState(0);
    //const [cadre, setCadre] = useState(true);

    const computeCadreSection = (): IResult => {

        const step1 = 1 / 5 * salary * Math.min(year, 7); // 0-7 ans
        const step2 = 3 / 5 * salary * Math.max(0, year - 7); // >8 ans 
        const step3 = 3 / 5 * salary * (mounth / 12); // residuel des mois
        const sum = step1 + step2 + step3;

        const result2 = <>
            Details
            <ul>
                <li> {CurrencyFormater.format(step1)} (les 7 premières années) </li>
                <li> {CurrencyFormater.format(step2)} (de la 8ème à la {year}ème année) </li>
                <li> {CurrencyFormater.format(step3)} ({mounth} derniers mois) </li>
                <li> TOTAL {CurrencyFormater.format(sum)} </li>
            </ul>
        </>;

        return {
            element: <> {result2}</>,
            sum: sum
        }
    }

    const textSection = computeCadreSection();
    return (

        <>
            <h4 className="mb-4" style={{fontWeight: 600}}> Informations </h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label> Salaire brut mensuel </Form.Label>
                    <Form.Control type="number" placeholder="0" onChange={(event) => setSalary(Number(event.target.value))} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Label> Année d'ancienneté </Form.Label>
                            <Form.Control type="number" placeholder="0" onChange={(event) => setYear(Number(event.target.value))} />
                        </Col>
                        <Col>
                            <Form.Label> Mois d'ancienneté </Form.Label>
                            <Form.Control type="number" placeholder="0" onChange={(event) => setMounth(Number(event.target.value))} />
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <div className="border-bottom m-4" />

            <h4 className="mb-4" style={{fontWeight: 600}}> Résultats </h4>
            {textSection.element}
        </>

        // result section
    );
}
export default RCCEngine;