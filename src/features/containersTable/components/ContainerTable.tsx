import useGetTestContainers from "features/containersTable/hooks/useGetTestContainers";
import Loading from "shared/components/Loading";
import {
    Button,
    Grid,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import useGetDevContainers from "features/containersTable/hooks/useGetDevContainers";

const parseJson = (string: string): any => {
    try {
        return JSON.parse(string);
    } catch (err) {
        console.log('Error: ', err.message);
    }
}

function ContainerTable(): JSX.Element {
    const {data: testData, isLoading: isTestDataLoading, refetch: refetchTestData} = useGetTestContainers()
    const {data: devData, isLoading: isDevDataLoading, refetch: refetchDevData} = useGetDevContainers()

    if(isTestDataLoading || isDevDataLoading) {
        return <Loading/>
    }
    const testItems = testData?.items ?? []
    const devItems = devData?.items ?? []
    return (
        <Grid container>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Test
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testItems?.map((item: any) => {
                                const kubernetes = parseJson(item.metadata["annotations"]["kubectl.kubernetes.io/last-applied-configuration"])
                                const containers = kubernetes?.["spec"]["template"]["spec"]["containers"]
                                return (
                                    <TableRow>
                                        <TableCell>
                                            Name: {item.metadata.name}
                                            <br/>
                                            {containers?.map((container) => {
                                              return (`Container: ${container.image}`)
                                            })}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Dev
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {devItems?.map((item: any) => {
                                const kubernetes = parseJson(item.metadata["annotations"]["kubectl.kubernetes.io/last-applied-configuration"])
                                const containers = kubernetes?.["spec"]["template"]["spec"]["containers"]
                                return (
                                    <TableRow>
                                        <TableCell>
                                            Name: {item.metadata.name}
                                            <br/>
                                            {containers?.map((container) => {
                                                return (`Container: ${container.image}`)
                                            })}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    onClick={() => {
                        refetchDevData()
                        refetchTestData()
                    }}>
                    Refetch Data
                </Button>
            </Grid>
        </Grid>
    )
}

export default ContainerTable