import React, {useState} from "react";
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import {InputGroup, Button, FormControl, Col, DropdownButton, Dropdown} from "react-bootstrap";
import {onPageLoad} from "../../store/actions";
import {textEllipsis} from "../../helpers/utils";

const statusOpt = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];
const sortOpt = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
]
const dateOpt = [
    {
        label: 'Created before',
        value: 'create_lte'
    },
    {
        label: 'Created after',
        value: 'create_gte'
    },
    {
        label: 'Completed before',
        value: 'complete_lte'
    },
    {
        label: 'Completed after',
        value: 'complete_gte'
    },

]

function Search({onPageLoad}) {

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState({
        label: '',
        value: ''
    })
    const [sort, setSort] = useState({
        label: '',
        value: ''
    })
    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null,
    })

    const handleChangeDate = (val, name) => {
        setDates({
            ...dates,
            [name]: val,
        })
    }

    const handleSubmit = () => {
        const params = {};
        search && (params.search = search);
        status.value && (params.status = status.value);
        sort.value && (params.sort = sort.value);

        for (const key in dates) {
            if (dates[key]) {
                params[key] = dates[key].toLocaleDateString();
            }
        }
        onPageLoad(params)
    }

    return (
        <Col xs={12}>
            <div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-primary"
                        title={status.value ? status.label : "Status"}
                        id="Status"
                    >
                        {
                            statusOpt.map((opt, ind) => (
                                <Dropdown.Item
                                    key={ind}
                                    onClick={() => setStatus(opt)}
                                    active={opt.value === status.value}
                                >
                                    {opt.label}
                                </Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-primary"
                        title={sort.value ? textEllipsis(sort.label, 4) : "Sort"}
                        id="Sort"
                    >
                        {
                            sortOpt.map((opt, ind) => (
                                <Dropdown.Item
                                    key={ind}
                                    onClick={() => setSort(opt)}
                                    active={opt.value === sort.value}
                                >
                                    {opt.label}
                                </Dropdown.Item>
                            ))
                        }


                    </DropdownButton>

                    <InputGroup.Append>
                        <Button
                            variant="outline-primary"
                            onClick={handleSubmit}
                        >Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <div className={'mt-2 d-flex flex-wrap align-items-center justify-content-between'}>
                {
                    dateOpt.map((opt, ind) => (
                        <div key={ind} className={'col-lg-3 col-md-6 text-center'}>
                            <fieldset className={"fieldset"}>
                                <legend className={'legend'}>{opt.label}</legend>
                                <DatePicker
                                    selected={dates[opt.value]}
                                    onChange={(val) => handleChangeDate(val, opt.value)}
                                />
                            </fieldset>
                        </div>


                    ))
                }
            </div>

        </Col>


    )
}


const mapDispatchToProps = {
    onPageLoad
}

export default connect(null, mapDispatchToProps)(Search)