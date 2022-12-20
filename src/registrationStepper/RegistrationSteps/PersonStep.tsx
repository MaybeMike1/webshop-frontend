import { Container, TextField } from '@mui/material'

interface ProfileFormProps {}
export const ProfileForm: React.FC<ProfileFormProps> = () => {
  return (
    <Container
      sx={{ flexBasis: '100%' ,flex: '1 ',display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: 'auto' }}
    >
     <TextField />
     <TextField />
     <TextField />
    </Container>
  )
}
