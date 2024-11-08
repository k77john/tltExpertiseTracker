import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import { useState } from 'react'

export default function AccordionUsage() {
    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange =
        (panel: string) =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false)
            console.log(event)
        }
    return (
        <div>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={<h1>Open</h1>}
                    aria-controls="panel2-content"
                    id="panel1d-header"
                >
                    <h1> Accordion 2</h1>
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<h1>Open</h1>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Accordion 1
                        </AccordionSummary>
                        <AccordionDetails>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse malesuada lacus ex, sit amet
                            blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

// export default function ControlledAccordions() {
//     const [expanded, setExpanded] = React.useState<string | false>(false)

//     const handleChange =
//         (panel: string) =>
//         (event: React.SyntheticEvent, isExpanded: boolean) => {
//             setExpanded(isExpanded ? panel : false)
//         }

//     return (
//         <div>
//             <Accordion
//                 expanded={expanded === 'panel1'}
//                 onChange={handleChange('panel1')}
//             >
//                 <AccordionSummary
//                     expandIcon={<h1>open</h1>}
//                     aria-controls="panel1bh-content"
//                     id="panel1bh-header"
//                 >
//                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
//                         General settings
//                     </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nulla facilisi. Phasellus sollicitudin nulla et quam
//                         mattis feugiat. Aliquam eget maximus est, id dignissim
//                         quam.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion
//                 expanded={expanded === 'panel2'}
//                 onChange={handleChange('panel2')}
//             >
//                 <AccordionSummary
//                     expandIcon={<h1>open</h1>}
//                     aria-controls="panel2bh-content"
//                     id="panel2bh-header"
//                 >
//                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
//                         Users
//                     </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Donec placerat, lectus sed mattis semper, neque lectus
//                         feugiat lectus, varius pulvinar diam eros in elit.
//                         Pellentesque convallis laoreet laoreet.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion
//                 expanded={expanded === 'panel3'}
//                 onChange={handleChange('panel3')}
//             >
//                 <AccordionSummary
//                     expandIcon={<h1>open</h1>}
//                     aria-controls="panel3bh-content"
//                     id="panel3bh-header"
//                 >
//                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
//                         Advanced settings
//                     </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nunc vitae orci ultricies, auctor nunc in, volutpat
//                         nisl. Integer sit amet egestas eros, vitae egestas
//                         augue. Duis vel est augue.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion
//                 expanded={expanded === 'panel4'}
//                 onChange={handleChange('panel4')}
//             >
//                 <AccordionSummary
//                     expandIcon={<h1>open</h1>}
//                     aria-controls="panel4bh-content"
//                     id="panel4bh-header"
//                 >
//                     <Typography sx={{ width: '33%', flexShrink: 0 }}>
//                         Personal data
//                     </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nunc vitae orci ultricies, auctor nunc in, volutpat
//                         nisl. Integer sit amet egestas eros, vitae egestas
//                         augue. Duis vel est augue.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//         </div>
//     )
// }
