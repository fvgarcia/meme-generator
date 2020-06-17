import React, {useState, useEffect} from 'react';

import {Wrapper, Card, Templates, Form, Button} from './styles';

import logo from '../../assets/logo.svg';

const Home = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.imgflip.com/get_memes");
            const {data: {memes}} = await response.json();
            setTemplates(memes);
        })();
    }, []);

    const handleInputChange = (index) => (e) => {
        const newValues = boxes;
        newValues[index] = e.target.value;
        setBoxes(newValues);
    };

    function handleSelectTemplate(template) {
        setSelectedTemplate(template);
        setBoxes([]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(boxes);
    }

    return (
        <Wrapper>
            <img src={logo} alt="MemeMaker"/>
            <Card>
                <h2>
                    Select a template
                </h2>
                <Templates>
                    {templates.map(template => (
                        <button
                            key={template.id}
                            type="button"
                            onClick={() => handleSelectTemplate(template)}
                            className={template.id === selectedTemplate?.id ? 'selected' : ''}
                        >
                            <img src={template.url} alt={template.name}/>
                        </button>
                    ))}
                </Templates>
                {selectedTemplate && (
                    <>
                        <h2>
                            Texts
                        </h2>
                        <Form onSubmit={handleSubmit}>
                            {(new Array(selectedTemplate.box_count))
                                .fill('')
                                .map((_, index) => (
                                    <input
                                        key={String(index+1)}
                                        placeholder={`Text #${index+1}`}
                                        onChange={handleInputChange(index)}
                                    />
                                ))}
                            <Button type="submit">MakeMyMeme</Button>
                        </Form>
                    </>
                )}
            </Card>
        </Wrapper>
    );
};

export default Home;