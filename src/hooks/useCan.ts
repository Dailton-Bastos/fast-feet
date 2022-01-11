import { useAuthContext } from '~/contexts/AuthContext'
import { ValidateUserPermissions } from '~/utils/validateUserPermissions'

type UseCanParams = {
  permissions?: string[]
  roles?: string[]
}

export const useCan = ({ permissions = [], roles = [] }: UseCanParams) => {
  const { user, isAuthenticated } = useAuthContext()

  if (!isAuthenticated) return false

  const userHasValidPermissions = ValidateUserPermissions({
    user,
    permissions,
    roles,
  })

  return userHasValidPermissions
}
